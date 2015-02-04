package com.test.newtest;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Animation;
import com.badlogic.gdx.graphics.g2d.TextureRegion;

/**
 * Created by Julien on 16/11/2014.
 */
public class MapRenderer {
    OrthographicCamera cam;
    public Bob bob;
    Animation bobLeft;
    Animation bobRight;
    Animation bobJumpLeft;
    Animation bobJumpRight;
    Animation bobIdleLeft;
    Animation bobIdleRight;
    Animation bobDead;
    Animation spawn;
    Animation dying;

    public MapRenderer(){
        this.cam = new OrthographicCamera(12,8);
        this.cam.position.set(0,0,0);
    }

    private void createAnimations () {
        Texture bobTexture = new Texture(Gdx.files.internal("data/bob.png"));
        TextureRegion[] split = new TextureRegion(bobTexture).split(20, 20)[0];
        TextureRegion[] mirror = new TextureRegion(bobTexture).split(20, 20)[0];
        for (TextureRegion region : mirror)
            region.flip(true, false);

        bobRight = new Animation(0.1f, split[0], split[1]);
        bobLeft = new Animation(0.1f, mirror[0], mirror[1]);
        bobJumpRight = new Animation(0.1f, split[2], split[3]);
        bobJumpLeft = new Animation(0.1f, mirror[2], mirror[3]);
        bobIdleRight = new Animation(0.5f, split[0], split[4]);
        bobIdleLeft = new Animation(0.5f, mirror[0], mirror[4]);
        bobDead = new Animation(0.2f, split[0]);
        split = new TextureRegion(bobTexture).split(20, 20)[2];
        spawn = new Animation(0.1f, split[4], split[3], split[2], split[1]);
        dying = new Animation(0.1f, split[1], split[2], split[3], split[4]);
    }

    public void render (float delta) {
        this.cam.position.add(delta*10,0,0);
        cam.update();
    }
}
