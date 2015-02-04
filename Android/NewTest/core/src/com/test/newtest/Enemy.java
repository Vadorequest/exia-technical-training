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

    public Enemy(float x, float y){
        this.position.x = x;
        this.position.y = y;
        image = new TextureRegion(new Texture("ADEL_PIXEL.png"));
    }

}
