package com.eringa.Reversi.domain;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "files")
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

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "data", length = 1000)
    private byte[] data;

    public Image() {
    }

    public Image(Long imageid, String name, String type, byte[] data) {
        this.imageid = imageid;
        this.name = name;
        this.type = type;
        this.data = data;
    }

    public Long getId() {
        return imageid;
    }

    public void setId(Long imageid) {
        this.imageid = imageid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}

