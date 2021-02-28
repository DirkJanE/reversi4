package com.eringa.Reversi.persistence;

import com.eringa.Reversi.domain.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    Optional<Score> findById(Long id);
    boolean existsById(Long id);
}
