package com.test.newtest.screens;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.InputAdapter;
import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.InputProcessor;
import com.badlogic.gdx.audio.Music;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Animation;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.badlogic.gdx.math.MathUtils;
import com.badlogic.gdx.math.Rectangle;
import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.TextButton;
import com.badlogic.gdx.scenes.scene2d.utils.ChangeListener;
import com.badlogic.gdx.utils.Array;
import com.test.newtest.Enemy;
import com.test.newtest.Enemy_2;
import com.test.newtest.Main.MainMenuScreen;
import com.test.newtest.MyStage;

import java.util.Random;

/**
 * Created by Julien on 03/12/2014.
 */
public class ScreenGame extends TestScreen {
    private static final float PLAYER_JUMP_IMPULSE = 930;
    private static final float GRAVITY = -30;
    private static final float PLAYER_VELOCITY_X = 250;
    private static final float PLAYER_START_Y = 44;
    private static final float PLAYER_START_X = 50;

    protected final MyStage stage;

    ShapeRenderer shapeRenderer;
    SpriteBatch batch;
    OrthographicCamera camera;
    OrthographicCamera uiCamera;
    Texture background;
    TextureRegion ground;
    TextureRegion wall;
    float groundOffsetX = 0;
    float wallOffsetX = 0;
    TextureRegion rock;
    TextureRegion adel;
    TextureRegion leo;
    TextureRegion rockDown;
    Animation player;
    TextureRegion ready;
    TextureRegion gameOver;
    BitmapFont font;

    Vector2 playerPosition = new Vector2();
    Vector2 playerVelocity = new Vector2();
    float playerStateTime = 0;
    Vector2 gravity = new Vector2();
    Array<Rock> rocks = new Array<Rock>();
    Array<Enemy> enemies = new Array<Enemy>();
    Array<Enemy_2> enemies_2 = new Array<Enemy_2>();


    GameState gameState = GameState.Start;
    int score = 0;
    Rectangle rect1 = new Rectangle();
    Rectangle rect2 = new Rectangle();

    Music music;
    Sound explode;
    Sound jump;
    int random_distance = 800;
    int random_1_2 = 1;

    //Menu
    Skin skin;
    Stage stage_menu;
    SpriteBatch batch_menu;


    public ScreenGame(final Game game) {

        super(game);
        this.game = game;
        stage = new MyStage();

        Gdx.input.setInputProcessor(stage);
        //prevents the app from being pause...
        Gdx.input.setCatchBackKey(true);
        Gdx.input.setCatchMenuKey(true);

        //Sets hard key listener...
        stage.setHardKeyListener(new MyStage.OnHardKeyListener() {
            @Override
            public void onHardKey(int keyCode, int state) {
                if(keyCode== Input.Keys.BACK && state==1){
                    game.dispose();
                    music.dispose();
                    game.setScreen(new MainMenuScreen(game));
                }
            }
        });

    }

    @Override
    public void show() {
        super.show();
        shapeRenderer = new ShapeRenderer();
        batch = new SpriteBatch();
        camera = new OrthographicCamera();
        camera.setToOrtho(false, 800, 480);
        uiCamera = new OrthographicCamera();
        uiCamera.setToOrtho(false, Gdx.graphics.getWidth(), Gdx.graphics.getHeight());
        uiCamera.update();

        font = new BitmapFont(Gdx.files.internal("arial.fnt"));
        font.setColor(Color.ORANGE);
        font.setScale(2, 2);

        background = new Texture("background.png");
        wall = new TextureRegion(new Texture("ground.png"));
        ground = new TextureRegion(new Texture("ground2.png"));

        adel = new TextureRegion(new Texture("ADEL_PIXEL2.png"));
        rock = new TextureRegion(new Texture("rock.png"));
        leo = new TextureRegion(new Texture("LEO_PIXEL2.png"));
        rockDown = new TextureRegion(rock);
        rockDown.flip(false, true);

        Texture frame1 = new Texture("ADEL_PIXEL2.png");
        frame1.setFilter(Texture.TextureFilter.Linear, Texture.TextureFilter.Linear);
        Texture frame2 = new Texture("ADEL_PIXEL2L.png");
        frame2.setFilter(Texture.TextureFilter.Linear, Texture.TextureFilter.Linear);
        Texture frame3 = new Texture("ADEL_PIXEL2R.png");
        frame3.setFilter(Texture.TextureFilter.Linear, Texture.TextureFilter.Linear);

        ready = new TextureRegion(new Texture("ready.png"));
        gameOver = new TextureRegion(new Texture("gameover.png"));


        player = new Animation(0.1f, new TextureRegion(frame1), new TextureRegion(frame2), new TextureRegion(frame1), new TextureRegion(frame3));
        player.setPlayMode(Animation.PlayMode.LOOP);

        music = Gdx.audio.newMusic(Gdx.files.internal("music2.mp3"));
        music.setLooping(true);
        music.play();

        explode = Gdx.audio.newSound(Gdx.files.internal("explode.wav"));
        jump = Gdx.audio.newSound(Gdx.files.internal("jump.mp3"));


        resetWorld();

    }

    private void resetWorld() {
        score = 0;
        groundOffsetX = 0;
        wallOffsetX = 0;
        playerPosition.set(PLAYER_START_X, PLAYER_START_Y);
        playerVelocity.set(0, 0);
        gravity.set(0, GRAVITY);
        camera.position.x = 400;

        menu_ingame();
        rocks.clear();
        enemies.clear();

        /*for(int i = 0; i < 4; i++) {
            int a = MathUtils.random(-100, -5);
            rocks.add(new Rock(700 + i * 300, a, rock));
        }*/

        enemies.add(new Enemy(700, 44));
        // enemies_2.add(new Enemy_2(1200, 44));
    }


    private void updateWorld() {
        float deltaTime = Gdx.graphics.getDeltaTime();
        playerStateTime += deltaTime;
        random_distance = random_enemy();

        rect1.set(playerPosition.x, playerPosition.y, player.getKeyFrames()[0].getRegionWidth(), player.getKeyFrames()[0].getRegionHeight());
        if (Gdx.input.justTouched()) {
            if (gameState == GameState.Start) {
                gameState = GameState.Running;
                playerVelocity.set(PLAYER_VELOCITY_X, 0);
            } else if (gameState == GameState.Running) {
                playerVelocity.set(PLAYER_VELOCITY_X, PLAYER_JUMP_IMPULSE);
                gameState = GameState.Jumping;
                jump.play();
            } else if (gameState == GameState.GameOver) {
                gameState = GameState.Start;
                resetWorld();
            }
        }

        if (gameState != GameState.Start) playerVelocity.add(gravity);

        playerPosition.mulAdd(playerVelocity, deltaTime);

        camera.position.x = playerPosition.x + 350;
        if (camera.position.x - groundOffsetX > ground.getRegionWidth() + 400) {
            groundOffsetX += ground.getRegionWidth();
        }

        if (camera.position.x - wallOffsetX > wall.getRegionWidth() + 400) {
            wallOffsetX -= wall.getRegionWidth();
        }

        rect1.set(playerPosition.x, playerPosition.y, player.getKeyFrames()[0].getRegionWidth(), player.getKeyFrames()[0].getRegionHeight());

        for (Rock r : rocks) {
            if (camera.position.x - r.position.x > 400 + r.image.getRegionWidth()) {
                int a = MathUtils.random(-100, -5);
                r.position.x += 4 * 300;
                r.position.y = a;
                r.image = rock;
                r.counted = false;
            }
            rect2.set(r.position.x + (r.image.getRegionWidth() - 30) / 2 + 20, r.position.y, 20, r.image.getRegionHeight() - 10);
            if (rect1.overlaps(rect2)) {
                if (gameState != GameState.GameOver) explode.play();
                gameState = GameState.GameOver;
                playerVelocity.x = 0;
            }
            if (r.position.x < playerPosition.x && !r.counted) {
                score++;
                r.counted = true;
            }
        }

        for (Enemy e : enemies) {

            if (camera.position.x - e.position.x > 400 + e.image.getRegionWidth()) {
                e.position.x += random_distance;
                e.position.y = 44;
                e.counted = false;
            }
            rect1.set(playerPosition.x, playerPosition.y, player.getKeyFrames()[0].getRegionWidth(), player.getKeyFrames()[0].getRegionHeight());
            rect2.set(e.position.x, e.position.y, e.image.getRegionWidth(), e.image.getRegionHeight());

            if (rect1.overlaps(rect2)) {
                if (gameState != GameState.GameOver) explode.play();
                gameState = GameState.GameOver;
                playerVelocity.x = 0;
            }
            if (e.position.x < playerPosition.x && !e.counted) {
                score++;
                e.counted = true;
            }
        }

        /*if(playerPosition.y + player.getKeyFrames()[0].getRegionHeight() > 480 - ground.getRegionHeight()) {
            if(gameState != GameState.GameOver) explode.play();
            gameState = GameState.GameOver;
            playerVelocity.x = 0;
        }*/

        if (playerPosition.y <= ground.getRegionHeight()) {
            playerPosition.y = ground.getRegionHeight();
            if (gameState != GameState.GameOver) gameState = GameState.Running;
        }
    }

    private void drawWorld() {
        camera.update();
        batch.setProjectionMatrix(camera.combined);
        batch.begin();
        batch.draw(background, camera.position.x - background.getWidth() / 2, 0);
        for (Rock rock : rocks) {
            batch.draw(rock.image, rock.position.x, rock.position.y);
        }

        for (Enemy e : enemies) {
            batch.draw(e.image, e.position.x, e.position.y);
        }

       /* for (Enemy_2 e : enemies_2) {
            batch.draw(e.image, e.position.x, e.position.y);
        }*/

        batch.draw(wall, groundOffsetX, 0);
        batch.draw(wall, groundOffsetX + wall.getRegionWidth() + 10, 0);

        batch.draw(ground, groundOffsetX, 0);
        batch.draw(ground, groundOffsetX + ground.getRegionWidth(), 0);


        batch.draw(player.getKeyFrame(playerStateTime), playerPosition.x, playerPosition.y);
        batch.end();

        batch.setProjectionMatrix(uiCamera.combined);
        batch.begin();
        if (gameState == GameState.Start) {
            batch.draw(ready, Gdx.graphics.getWidth() / 2 - ready.getRegionWidth() / 2, Gdx.graphics.getHeight() / 2 - ready.getRegionHeight() / 2);
        }
        if (gameState == GameState.GameOver) {
            batch.draw(gameOver, Gdx.graphics.getWidth() / 2 - gameOver.getRegionWidth() / 2, Gdx.graphics.getHeight() / 2 - gameOver.getRegionHeight() / 2);
        }
        if (gameState == GameState.GameOver || gameState == GameState.Running || gameState == GameState.Jumping) {
            font.draw(batch, "" + score, Gdx.graphics.getWidth() / 2, Gdx.graphics.getHeight() - 60);
        }
        batch.end();

    }

    @Override
    public void render(float delta) {
        Gdx.gl.glClearColor(1, 0, 0, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        // random_1_2 = random_1_2();

        updateWorld();
        drawWorld();


        stage.act(Math.min(Gdx.graphics.getDeltaTime(), 1 / 30f));
        stage_menu.draw();


    }

    private int random_enemy() {
        int min = 800;
        int max = 1500;
        Random random = new Random();
        int randomInt = random.nextInt(max - min + 1) + min;
        return randomInt;
    }

    private int random_1_2() {
        int min = 1;
        int max = 2;
        Random random = new Random();
        int randomInt = random.nextInt(max - min + 1) + min;
        System.out.println("randomInt : " + randomInt);
        return randomInt;
    }

    private void menu_ingame()
    {
        System.out.println("#1");

        stage_menu = new Stage();
        Gdx.input.setInputProcessor(stage_menu);
        stage_menu.clear();
        skin = new Skin();

        Pixmap pixmap = new Pixmap(100, 100, Pixmap.Format.RGBA8888);
        pixmap.setColor(Color.BLUE);
        pixmap.fill();

        skin.add("white", new Texture(pixmap));

        BitmapFont bfont=new BitmapFont();
        bfont.scale(1);
        skin.add("default",bfont);

        TextButton.TextButtonStyle textButtonStyle = new TextButton.TextButtonStyle();
        textButtonStyle.up = skin.newDrawable("white", Color.DARK_GRAY);
        textButtonStyle.down = skin.newDrawable("white", Color.DARK_GRAY);
        textButtonStyle.checked = skin.newDrawable("white", Color.BLUE);
        textButtonStyle.over = skin.newDrawable("white", Color.LIGHT_GRAY);

        textButtonStyle.font = skin.getFont("default");

        skin.add("default", textButtonStyle);


        final TextButton Btn_Play=new TextButton(" REPLAY ",textButtonStyle);
        Btn_Play.setPosition(220, 1000);
        stage_menu.addActor(Btn_Play);

        Btn_Play.addListener(new ChangeListener() {
            public void changed (ChangeEvent event, Actor actor) {
                Btn_Play.setText("Replay...");
                gameState = GameState.Start;
                resetWorld();

            }
        });

        final TextButton Btn_Scores=new TextButton(" MAIN MENU ",textButtonStyle);
        Btn_Scores.setPosition(20, 1000);
        stage_menu.addActor(Btn_Scores);

        Btn_Scores.addListener(new ChangeListener() {
            public void changed (ChangeEvent event, Actor actor) {
                Btn_Scores.setText("Back");
                game.dispose();
                music.dispose();
                game.setScreen(new MainMenuScreen(game));
            }
        });

        final TextButton Btn_Exit=new TextButton("EXIT",textButtonStyle);
        Btn_Exit.setPosition(1800, 1000);
        stage_menu.addActor(Btn_Exit);

        Btn_Exit.addListener(new ChangeListener() {
            public void changed (ChangeEvent event, Actor actor) {
                Btn_Exit.setText("Bye Bye");
                Gdx.app.exit();
            }
        });
        Gdx.input.setInputProcessor(stage_menu);
        Gdx.input.setCatchBackKey(true);
        InputProcessor backProcessor = new InputAdapter() {
            @Override
            public boolean keyDown(int keycode) {

                if ((keycode == Input.Keys.ESCAPE) || (keycode == Input.Keys.BACK) ) {
                    game.dispose();
                    music.dispose();
                    game.setScreen(new MainMenuScreen(game));
                }

                return false;
            }
        };
        InputMultiplexer multiplexer = new InputMultiplexer(stage_menu,
                backProcessor);
        Gdx.input.setInputProcessor(multiplexer);
    }

    @Override
    public void resize (int width, int height) {
        stage.getViewport().update(width, height, false);
    }
    static class Rock {
        Vector2 position = new Vector2();
        TextureRegion image;
        boolean counted;

        public Rock(float x, float y, TextureRegion image) {
            this.position.x = x;
            this.position.y = y;
            this.image = image;
        }
    }

    static enum GameState {
        Start, Running, Jumping, GameOver
    }
}

