package com.eringa.Reversi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Entity
@Table(name = "score")
public class Score {

    @Id
    @GeneratedValue(
            strategy= GenerationType.AUTO,
            generator="native"
    )
    @GenericGenerator(
            name = "native",
            strategy = "native"
    )
    @Column(name = "id", columnDefinition = "serial")
    private Long id;
    private long gamesplayed;
    private long gameswon;
    private long stoneswon;
    private Long userId;


    public Score() {

    }

    public Score(long gamesplayed, long gameswon, long stoneswon, Long userId) {
        this.gamesplayed = gamesplayed;
        this.gameswon = gameswon;
        this.stoneswon = stoneswon;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getGamesPlayed() {
        return gamesplayed;
    }

    public void setGamesPlayed(long gamesplayed) {
        this.gamesplayed = gamesplayed;
    }

    public long getGamesWon() {
        return gameswon;
    }

    public void setGamesWon(long gameswon) {
        this.gameswon = gameswon;
    }

    public long getStoneswon() {
        return stoneswon;
    }

    public void setStoneswon(long stoneswon) {
        this.stoneswon = stoneswon;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
