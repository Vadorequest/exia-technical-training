package com.test.newtest.screens;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.test.newtest.MapRenderer;

/**
 * Created by Julien on 16/11/2014.
 */
public class ScreenOne extends TestScreen {

    MapRenderer renderer;
	SpriteBatch batch;
	Texture img;
    boolean firstTime = true;

    public ScreenOne (Game game) {
        super(game);
    }

    @Override
    public void show() {
        super.show();
        renderer = new MapRenderer();
        Gdx.app.debug("Test", "Screen creating");
        batch = new SpriteBatch();
        img = new Texture("badlogic.jpg");

    }

    @Override
    public void render (float delta) {
        Gdx.gl.glClearColor(1, 0, 0, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        batch.begin();
        batch.draw(img, 0, 0);
        batch.end();

        renderer.render(delta);

    }
}
