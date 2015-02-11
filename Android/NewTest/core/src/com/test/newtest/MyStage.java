package com.test.newtest;

import com.badlogic.gdx.Input;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.scenes.scene2d.Stage;

/**
 * Created by Léo on 10/02/2015.
 */
public class MyStage extends Stage {
    public MyStage(){

    }
    @Override
    public boolean keyDown(int keyCode) {
        if(keyCode== Input.Keys.BACK||keyCode== Input.Keys.MENU){
            if(getHardKeyListener()!=null)
                getHardKeyListener().onHardKey(keyCode, 1);
        }
        return super.keyDown(keyCode);
    }
    @Override
    public boolean keyUp(int keyCode) {
        if(keyCode== Input.Keys.BACK||keyCode== Input.Keys.MENU){
            if(getHardKeyListener()!=null)
                getHardKeyListener().onHardKey(keyCode, 0);
        }
        return super.keyUp(keyCode);
    }

    /*********************Hard key listener***********************/
    public interface OnHardKeyListener{
        /**
         * Happens when user press hard key
         * @param keyCode Back or Menu key (keyCode one of the constants in Input.Keys)
         * @param state 1 - key down, 0 - key up
         */
        public abstract void onHardKey(int keyCode, int state);
    }
    private OnHardKeyListener _HardKeyListener = null;
    public void setHardKeyListener(OnHardKeyListener HardKeyListener) {
        _HardKeyListener = HardKeyListener;
    }
    public OnHardKeyListener getHardKeyListener() {
        return _HardKeyListener;
    }
}