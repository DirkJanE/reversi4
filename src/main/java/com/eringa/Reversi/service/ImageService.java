package com.eringa.Reversi.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Stream;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import com.eringa.Reversi.domain.Image;
import com.eringa.Reversi.persistence.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public ResponseEntity.BodyBuilder uploadImage(Long userid, MultipartFile file) throws IOException {

        //System.out.println("Original Image Byte Size - " + file.getBytes().length);
        Image image = new Image();
        Image img = new Image(image.getId(), file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()), image.setUserid(userid));
        imageRepository.save(img);
        return ResponseEntity.status(HttpStatus.OK);
    }

    public Image getImage(Long userid) {

        final Optional<Image> retrievedImage = imageRepository.findByUserid(userid);
        Image img = new Image(retrievedImage.get().getId(), retrievedImage.get().getName(), retrievedImage.get().getType(),
                decompressBytes(retrievedImage.get().getData()), retrievedImage.get().getUserId());
        return img;
    }

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        //System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
}
