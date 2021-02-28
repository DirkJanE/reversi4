package com.eringa.Reversi.controller;

import com.eringa.Reversi.domain.Image;
import com.eringa.Reversi.payload.response.MessageResponse;
import com.eringa.Reversi.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.Stream;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/postimage/{userid}")
    public ResponseEntity<MessageResponse> uploadImage(@PathVariable Long userid, @RequestParam("file") MultipartFile image) {
        String message = "";
        try {
            imageService.uploadImage(userid, image);

            message = "Uploaded the file successfully: " + image.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + image.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }

    @GetMapping("/getimage/{userid}")
    public Image getImage(@PathVariable("userid") Long userid) {
        return imageService.getImage(userid);
    }
}
