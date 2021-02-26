package com.ccbft.wifishare.server;

import android.util.Log;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.http.HttpEntity;
import org.apache.http.HttpException;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.entity.StringEntity;
import org.apache.http.message.BasicHttpEntityEnclosingRequest;
import org.apache.http.protocol.HTTP;
import org.apache.http.protocol.HttpContext;
import org.apache.http.protocol.HttpRequestHandler;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.List;

public class HttpUploadHander implements HttpRequestHandler {
    private String webRoot;

    public HttpUploadHander(String webRoot) {
        this.webRoot = webRoot;
    }

    @Override
    public void handle(HttpRequest httpRequest, HttpResponse httpResponse, HttpContext httpContext) throws HttpException, IOException {
        String uri = httpRequest.getRequestLine().getUri();
        Log.d("URI", uri);
        HttpEntity t=((BasicHttpEntityEnclosingRequest) httpRequest).getEntity();
        httpResponse.setEntity(new StringEntity("上传成功！","utf-8"));
        InputStream inputStream=t.getContent();
        int read = inputStream.read();
        Log.d("READ", ""+read);


    }
}
