package com.eringa.Reversi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Entity
@Table(name = "score")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    private long gamesplayed;
    private long gameswon;
    private long stoneswon;

    @OneToOne(mappedBy="score", cascade=CascadeType.ALL)
    private User user;

    public Score() {

    }

    public Score(long gamesplayed, long gameswon, long stoneswon) {
        this.gamesplayed = gamesplayed;
        this.gameswon = gameswon;
        this.stoneswon = stoneswon;
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
}
