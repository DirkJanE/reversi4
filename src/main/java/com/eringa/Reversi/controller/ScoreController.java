package com.eringa.Reversi.controller;

import com.eringa.Reversi.domain.Score;
import com.eringa.Reversi.payload.response.MessageResponse;
import com.eringa.Reversi.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/score")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    @GetMapping("/getscore/{id}")
    public Optional<Score> getScoreById(@PathVariable Long id) {
        return scoreService.getScoreById(id);
    }

    @PutMapping("/putscore/{id}")
    public ResponseEntity<MessageResponse> updateScoreById(@PathVariable long id, @RequestBody Score updatedScore) {
        return scoreService.updateScoreById(id, updatedScore);
    }
}
