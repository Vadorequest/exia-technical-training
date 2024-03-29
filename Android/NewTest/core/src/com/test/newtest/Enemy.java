package com.test.newtest;

import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.math.Vector2;

/**
 * Created by Julien on 10/12/2014.
 */
public class Enemy {
    public Vector2 position = new Vector2();
    public TextureRegion image;
    public boolean counted;

    public Enemy(float x, float y){
        counted = false;
        this.position.x = x;
        this.position.y = y;
        image = new TextureRegion(new Texture("LEO_PIXEL2.png"));
    }
}
