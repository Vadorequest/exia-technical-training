package com.test.newtest.screens;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.Screen;

/**
 * Created by Julien on 16/11/2014.
 */
public abstract class TestScreen implements Screen{
    Game game;

    public TestScreen (Game game) {
        this.game = game;
    }

    @Override
    public void resize (int width, int height) {
    }

    @Override
    public void show () {
    }

    @Override
    public void hide () {
    }

    @Override
    public void pause () {
    }

    @Override
    public void resume () {
    }

    @Override
    public void dispose () {
    }
}
