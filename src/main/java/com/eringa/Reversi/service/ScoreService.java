package com.eringa.Reversi.service;

import com.eringa.Reversi.domain.Score;
import com.eringa.Reversi.payload.response.MessageResponse;
import com.eringa.Reversi.persistence.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    public Optional<Score> getScoreById(Long id) {
        return scoreRepository.findById(id);
    }

    public ResponseEntity<MessageResponse> updateScoreById(Long scoreid, Score updatedScore) {
        if (Boolean.FALSE.equals(scoreRepository.existsById(scoreid))) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Id does not exist. Score not updated"));
        }
        updatedScore.setId(scoreid);
        scoreRepository.save(updatedScore);
        return ResponseEntity.ok(new MessageResponse("Score updated successfully!"));
    }
}

