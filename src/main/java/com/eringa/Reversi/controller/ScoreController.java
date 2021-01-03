package com.eringa.Reversi.controller;

import com.eringa.Reversi.domain.Score;
import com.eringa.Reversi.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/score")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    @PostMapping("/createscore")
    public Score createScore(Score newScore) {
        return scoreService.createScore(newScore);
    }

    @GetMapping("/getscore/{userid}")
    public Optional<Score> getScoreById(@PathVariable Long userid) {
        return scoreService.getScoreByUserId(userid);
    }

    @PutMapping("/putscore/{id}")
    public Score updateScoreById(@PathVariable long id, @RequestBody Score updatedScore) {
        return scoreService.updateScoreById(id, updatedScore);
    }

}
