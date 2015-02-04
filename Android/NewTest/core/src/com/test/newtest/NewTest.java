package com.test.newtest;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Game;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.test.newtest.screens.ScreenGame;

public class NewTest extends Game {
	SpriteBatch batch;
	Texture img;
	
	@Override
	public void create () {setScreen(new ScreenGame(this));}

	@Override
	public void render () {
		super.render();
	}
}
