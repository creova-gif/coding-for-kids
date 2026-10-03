package com.example.codeforkids

import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application

fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "Codeforkids",
    ) {
        App()
    }
}