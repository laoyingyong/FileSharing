package com.ccbft.wifishare;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.widget.CompoundButton;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ToggleButton;

import com.ccbft.wifishare.server.WebService;
import com.ccbft.wifishare.util.CopyUtil;

import org.apache.http.conn.util.InetAddressUtils;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

public class MainActivity extends Activity implements CompoundButton.OnCheckedChangeListener {

    private static final String TAG = "WFSActivity";
    private ToggleButton toggleBtn;
    private TextView urlText;
    private Intent intent;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        initViews();
        if(Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)){
            if(Build.VERSION.SDK_INT>=23){//6.0以上的版本，加入动态权限申请
                if(ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE)!= PackageManager.PERMISSION_GRANTED){//如果没有授权
                   ActivityCompat.requestPermissions(this,new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE,Manifest.permission.READ_EXTERNAL_STORAGE},1);
                }else{
                    //saveFile();
                }

            }else {
                //saveFile();
            }
        }
        initFiles();

        intent = new Intent(this, WebService.class);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(requestCode==1){

        }
    }

    private void initViews() {
        toggleBtn = (ToggleButton) findViewById(R.id.toggleBtn);
        toggleBtn.setOnCheckedChangeListener(this);
        urlText = (TextView) findViewById(R.id.urlText);
    }


    private void initFiles() {
        new CopyUtil(this).assetsCopy();
    }

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        Log.e(TAG, "=============isChecked================="+isChecked);
        if (isChecked) {
            String ip = getLocalIpAddressIP4();
            if (ip == null) {
                Toast.makeText(this, R.string.msg_net_off, Toast.LENGTH_SHORT).show();
                urlText.setText("");
            } else {
                startService(intent);
                urlText.setText("http://" + ip + ":" + WebService.PORT + "/");
            }
        } else {
            stopService(intent);
            urlText.setText("");
        }
    }

    /** 获取当前IP地址 */
    private String getLocalIpAddress() {
        try {
            // 遍历网络接口
            for (Enumeration<NetworkInterface> en = NetworkInterface
                    .getNetworkInterfaces(); en.hasMoreElements();)

            {
                NetworkInterface intf = en.nextElement();
                // 遍历IP地址
                for (Enumeration<InetAddress> enumIpAddr = intf
                        .getInetAddresses(); enumIpAddr.hasMoreElements();) {
                    InetAddress inetAddress = enumIpAddr.nextElement();
                    // 非回传地址时返回
                    if (!inetAddress.isLoopbackAddress()) {
                        return inetAddress.getHostAddress().toString();
                    }
                }
            }
        } catch (SocketException e) {
            e.printStackTrace();
        }
        return null;
    }

    /*
     * 获取手机ip地址
     */
    public String getLocalIpAddressIP4() {
        try {
            String ipv4;
            List<NetworkInterface> nilist = Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface ni : nilist) {
                List<InetAddress> ialist = Collections.list(ni
                        .getInetAddresses());
                for (InetAddress address : ialist) {
                    if (!address.isLoopbackAddress()
                            && InetAddressUtils.isIPv4Address(ipv4 = address
                            .getHostAddress())) {
                        return ipv4;
                    }
                }

            }

        } catch (SocketException ex) {
        }
        return null;
    }


    @Override
    public void onBackPressed() {
        if (intent != null) {
            stopService(intent);
        }
        super.onBackPressed();
    }




    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}