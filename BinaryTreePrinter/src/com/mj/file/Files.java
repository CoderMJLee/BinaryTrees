package com.mj.file;

import java.io.File;
import java.io.FileWriter;

public class Files {
	public static void writeToFile(String filePath, Object data) {
		if (filePath == null || data == null) return;
		
		try {
			File file = new File(filePath);
			if (!file.exists()) {
				file.getParentFile().mkdirs();
				file.createNewFile();
			}
			
			FileWriter writer = new FileWriter(file, false);
			writer.write(data.toString());
			writer.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
