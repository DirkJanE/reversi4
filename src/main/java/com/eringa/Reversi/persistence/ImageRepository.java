package com.eringa.Reversi.persistence;

import com.eringa.Reversi.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
            Optional <Image> findByUserid(Long userid);
}
