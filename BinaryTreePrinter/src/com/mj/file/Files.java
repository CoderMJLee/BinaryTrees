package com.mj.file;

import java.io.BufferedWriter;
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
			
			try (FileWriter writer = new FileWriter(file, false);
					BufferedWriter out = new BufferedWriter(writer) ) {
				out.write(data.toString());
                out.flush();
            }
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
