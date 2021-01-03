package com.eringa.Reversi.service;

import com.eringa.Reversi.domain.Score;
import com.eringa.Reversi.persistence.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    public Score createScore(Score newScore) {
        return scoreRepository.save(newScore);
    }

    public Optional<Score> getScoreByUserId(Long userid) {
        return scoreRepository.findByUserId(userid);
                //.orElseThrow(() -> new UsernameNotFoundException(userid.toString())); //nog aan te passen
    }


    public Score updateScoreById(Long scoreid, Score updatedScore) {
        updatedScore.setId(scoreid);
        return scoreRepository.save(updatedScore);
    }
}
