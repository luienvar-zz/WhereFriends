package com.wherefriends;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.os.Bundle;
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;

import android.content.Intent;

public class MainActivity extends ReactActivity {

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected String getMainComponentName() {
        return "WhereFriends";
    }
}
