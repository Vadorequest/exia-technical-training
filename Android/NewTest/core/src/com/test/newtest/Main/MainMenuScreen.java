package com.test.newtest.Main;

/**
 * Created by Léo on 10/02/2015.
 */
import com.badlogic.gdx.ApplicationListener;
import com.badlogic.gdx.Game;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.InputAdapter;
import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.InputProcessor;
import com.badlogic.gdx.Screen;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Pixmap.Format;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.Table;
import com.badlogic.gdx.scenes.scene2d.ui.TextButton;
import com.badlogic.gdx.scenes.scene2d.ui.TextButton.TextButtonStyle;
import com.badlogic.gdx.scenes.scene2d.utils.ChangeListener;
import com.badlogic.gdx.utils.viewport.ExtendViewport;
import com.badlogic.gdx.utils.viewport.StretchViewport;
import com.badlogic.gdx.utils.viewport.Viewport;
import com.test.newtest.screens.ScreenGame;

public class MainMenuScreen implements Screen {
    Skin skin;
    Stage stage;
    SpriteBatch batch;

    Game g;
    public MainMenuScreen(Game g){
        create();
        this.g=g;
    }

    public MainMenuScreen(){
        create();
    }
    public void create(){
        batch = new SpriteBatch();
        stage = new Stage();
        Gdx.input.setInputProcessor(stage);

         skin = new Skin();

        Pixmap pixmap = new Pixmap(100, 100, Format.RGBA8888);
        pixmap.setColor(Color.BLUE);
        pixmap.fill();

        skin.add("white", new Texture(pixmap));

        BitmapFont bfont=new BitmapFont();
        bfont.scale(1);
        skin.add("default",bfont);

        TextButtonStyle textButtonStyle = new TextButtonStyle();
        textButtonStyle.up = skin.newDrawable("white", Color.DARK_GRAY);
        textButtonStyle.down = skin.newDrawable("white", Color.DARK_GRAY);
        textButtonStyle.checked = skin.newDrawable("white", Color.BLUE);
        textButtonStyle.over = skin.newDrawable("white", Color.LIGHT_GRAY);

        textButtonStyle.font = skin.getFont("default");

        skin.add("default", textButtonStyle);


        final TextButton Btn_Play=new TextButton("PLAY",textButtonStyle);
        Btn_Play.setPosition(200, 200);
        stage.addActor(Btn_Play);

        Btn_Play.addListener(new ChangeListener() {
            public void changed (ChangeEvent event, Actor actor) {
                Btn_Play.setText("Starting new game");
                g.setScreen( new ScreenGame(g));
            }
        });

        final TextButton Btn_Scores=new TextButton(" SCORES ",textButtonStyle);
        Btn_Scores.setPosition(400, 200);
        stage.addActor(Btn_Scores);

        Btn_Scores.addListener(new ChangeListener() {
            public void changed (ChangeEvent event, Actor actor) {
                Btn_Scores.setText("Showing Scores");
                g.setScreen( new ScreenGame(g));

            }
        });

        final TextButton Btn_Exit=new TextButton("EXIT",textButtonStyle);
        Btn_Exit.setPosition(600, 200);
        stage.addActor(Btn_Exit);

        Btn_Exit.addListener(new ChangeListener() {
            public void changed (ChangeEvent event, Actor actor) {
                Btn_Exit.setText("Bye Bye");
                Gdx.app.exit();
            }
        });
        Gdx.input.setCatchBackKey(true);
        InputProcessor backProcessor = new InputAdapter() {
            @Override
            public boolean keyDown(int keycode) {

                if ((keycode == Input.Keys.ESCAPE) || (keycode == Input.Keys.BACK) ) {
                    Gdx.app.exit();
                }

                return false;
            }
        };
        InputMultiplexer multiplexer = new InputMultiplexer(stage,
                backProcessor);
        Gdx.input.setInputProcessor(multiplexer);

    }

    public void render (float delta) {
        Gdx.gl.glClearColor(0.2f, 0.2f, 0.2f, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        stage.act(Math.min(Gdx.graphics.getDeltaTime(), 1 / 30f));
        stage.draw();
    }

    @Override
    public void resize (int width, int height) {
        stage.getViewport().update(width, height, false);
    }

    @Override
    public void dispose () {
        stage.dispose();
        skin.dispose();
    }

    @Override
    public void show() {
        // TODO Auto-generated method stub

    }

    @Override
    public void hide() {
        // TODO Auto-generated method stub

    }

    @Override
    public void pause() {
        // TODO Auto-generated method stub

    }

    @Override
    public void resume() {
        // TODO Auto-generated method stub

    }
}
