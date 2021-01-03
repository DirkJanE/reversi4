package com.eringa.Reversi.controller;

import com.eringa.Reversi.domain.Image;
import com.eringa.Reversi.payload.response.MessageResponse;
import com.eringa.Reversi.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/postimage")
    public ResponseEntity<MessageResponse> uploadImage(@RequestParam("file") MultipartFile image) {
        String message = "";
        try {
            imageService.uploadImage(image);

            message = "Uploaded the file successfully: " + image.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + image.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }

    @GetMapping("/getimage/{imageName}")
    public Image getImage(@PathVariable("imageName") String imageName) {
        return imageService.getImage(imageName);
    }

    @DeleteMapping("/deleteimage/{imageid}")
    public String deleteImage(@PathVariable("imageid") Long imageid) {
        return imageService.deleteImage(imageid);
    }
}
