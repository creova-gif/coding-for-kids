package com.example.codeforkids

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform