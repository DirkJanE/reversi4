package com.eringa.Reversi.domain;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "image")
public class Image {
    @Id
    @GeneratedValue(
            strategy= GenerationType.AUTO,
            generator="native"
    )
    @GenericGenerator(
            name = "native",
            strategy = "native"
    )
    @Column(name = "imageid")
    private Long imageid;

    @Column(name = "imagename")
    private String imagename;

    @Column(name = "imagetype")
    private String imagetype;

    @Column(name = "imagedata", length = 1000)
    private byte[] imagedata;

    @Column(name = "userid")
    private Long userid;

    @OneToOne(mappedBy="image", cascade=CascadeType.ALL)
    private User user;

    public Image() {
    }

    public Image(Long imageid, String imagename, String imagetype, byte[] imagedata, long userid) {
        this.imageid = imageid;
        this.imagename = imagename;
        this.imagetype = imagetype;
        this.imagedata = imagedata;
        this.userid = userid;
    }

    public Long getId() {
        return imageid;
    }

    public void setId(Long imageid) {
        this.imageid = imageid;
    }

    public String getName() {
        return imagename;
    }

    public void setName(String imagename) {
        this.imagename = imagename;
    }

    public String getType() {
        return imagetype;
    }

    public void setType(String imagetype) {
        this.imagetype = imagetype;
    }

    public byte[] getData() {
        return imagedata;
    }

    public void setData(byte[] imagedata) {
        this.imagedata = imagedata;
    }

    public Long getUserId() {
        return userid;
    }

    public Long setUserid(long userid) {
        this.userid = userid;
        return userid;
    }
}

