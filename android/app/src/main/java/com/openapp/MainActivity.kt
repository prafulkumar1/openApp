package com.openapp

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val openReactNativeButton: Button = findViewById(R.id.open_react_native_button)
        openReactNativeButton.setOnClickListener {
            val intent = Intent(this, MyReactNativeActivity::class.java)
            startActivity(intent)
        }
    }
}
