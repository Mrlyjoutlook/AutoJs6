package org.autojs.autojs.runtime.api

import android.util.Log
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.TextRecognizer
import com.google.mlkit.vision.text.chinese.ChineseTextRecognizerOptions
import org.autojs.autojs.core.image.ImageWrapper

/**
 * MLKit OCR implementation for text recognition.
 * 
 * Uses ChineseTextRecognizerOptions which supports recognition of both:
 * - Chinese characters (Simplified Chinese / 简体中文)
 * - Latin script (English and other Latin-based languages)
 * 
 * This enables mixed language recognition (chi_sim_eng) where text can contain
 * both Chinese and English characters in the same image.
 * 
 * Created by SuperMonster003 on Mar 18, 2023.
 */
// @Reference to TonyJiangWJ/Auto.js (https://github.com/TonyJiangWJ/Auto.js) by SuperMonster003 on Mar 18, 2023.
class OcrMLKit {

    private var recognizer: TextRecognizer? = null

    /**
     * Initializes the text recognizer if not already initialized.
     * Uses ChineseTextRecognizerOptions to support both Chinese and English text recognition.
     */
    private fun initIfNeeded() {
        recognizer ?: let {
            // ChineseTextRecognizerOptions supports both Chinese and Latin (English) scripts
            recognizer = TextRecognition.getClient(ChineseTextRecognizerOptions.Builder().build())
        }
    }

    fun release() {
        recognizer?.close()
    }

    fun detect(image: ImageWrapper?): List<OcrResult> {
        initIfNeeded()

        image?.takeUnless { image.isRecycled } ?: return emptyList()

        val bitmap = image.bitmap
        if (bitmap.isRecycled) return emptyList<OcrResult>().also { image.shoot() }

        val inputImage = InputImage.fromBitmap(bitmap, 0)
        val result = recognizer!!.process(inputImage)
            .addOnCanceledListener { lockNotify() }
            .addOnCompleteListener { lockNotify() }
            .addOnSuccessListener { lockNotify() }
            .addOnFailureListener { e: Exception ->
                Log.w(TAG, "Failed to detect: ${e.message}")
                e.printStackTrace()
                lockNotify()
            }
        while (!result.isComplete) {
            synchronized(lock) {
                try {
                    lock.wait(50)
                } catch (_: InterruptedException) {
                    /* Ignored. */
                }
            }
        }
        image.shoot()
        if (!result.isSuccessful) {
            Log.w(TAG, "Detection is not successful")
            return emptyList()
        }
        val ocrResults = ArrayList<OcrResult>()
        result.result.textBlocks.forEach { block ->
            block.lines.forEach { line ->
                OcrResult(line.text, line.confidence, line.boundingBox!!).run {
                    ocrResults.add(this)
                }
            }
        }
        return ocrResults
    }

    fun recognizeText(image: ImageWrapper?): List<String> {
        image?.takeUnless { image.isRecycled } ?: return emptyList()
        initIfNeeded()
        val words = detect(image).sorted()
        return mutableListOf<String>().also { list ->
            words.indices.forEach { i -> words[i].label.let { list.add(it) } }
        }
    }

    private fun lockNotify() = synchronized(lock) { lock.notify() }

    companion object {

        private val lock = Object()

        private val TAG: String = Companion::class.java.simpleName

    }

}