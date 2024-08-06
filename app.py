from flask import Flask, render_template, request, jsonify
import pygame
import os
import webbrowser

app = Flask(__name__)

# Инициализация pygame для воспроизведения музыки
pygame.mixer.init()

# Путь к директории с мелодиями
MUSIC_FOLDER = os.path.join('static', 'music')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play', methods=['POST'])
def play():
    melody = request.form.get('melody')
    if melody:
        music_path = os.path.join(MUSIC_FOLDER, melody)
        if os.path.exists(music_path):
            pygame.mixer.music.load(music_path)
            pygame.mixer.music.play()
    return '', 204

@app.route('/stop', methods=['POST'])
def stop():
    pygame.mixer.music.stop()
    return '', 204

#Для таймера 
@app.route('/play_sound')
def play_sound():
    return jsonify(success=True)

webbrowser.open("http://127.0.0.1:5000/")

if __name__ == '__main__':
    app.run(debug=True)