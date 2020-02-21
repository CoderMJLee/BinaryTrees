package com.mj.file;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

public class Files {
	
	public static void writeToFile(String filePath, Object data) {
		writeToFile(filePath, data, false);
	}
	
	public static void writeToFile(String filePath, Object data, boolean append) {
		if (filePath == null || data == null) return;
		
		try {
			File file = new File(filePath);
			File pFile = file.getParentFile();
			if (pFile != null) {
				pFile.mkdirs();
			}
			
			try (
				FileWriter writer = new FileWriter(file, append);
				BufferedWriter out = new BufferedWriter(writer) 
			) {
				out.write(data.toString());
            }
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
