import urllib.request
import json
import base64
import os
import time

key = os.environ.get('GEMINI_API_KEY', '')
if not key:
    raise ValueError("GEMINI_API_KEY environment variable is not set. Please set it before running this script.")
url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent?key={key}'

os.makedirs('public/audio/spider', exist_ok=True)

tracks = [
    {
        'key': 'hero',
        'text': "Hey! I'm Gaurav's spatial sidekick. Ready to explore 3D, Generative AI, and the Spatial Web?",
        'style': "curious, bright, friendly, charming little companion with natural pacing"
    },
    {
        'key': 'specialties',
        'text': "3D CGI, Unreal Engine, and ComfyUI generative workflows — pure craft and technical implementation!",
        'style': "enthusiastic, impressed, friendly tech companion with clear articulation"
    },
    {
        'key': 'work',
        'text': "Ooh, my favorite part! Over 40 featured commercial projects spanning 12 countries!",
        'style': "excited, delighted, cheerful and proud companion"
    },
    {
        'key': 'capabilities',
        'text': "Interactive 3D shaders, WebGL pipelines, and spatial UX prototypes built for production!",
        'style': "smart, confident, engaging, clear and friendly"
    },
    {
        'key': 'process',
        'text': "From initial sketch to full spatial deployment across 6 battle-tested creative pipelines!",
        'style': "encouraging, insightful, smooth and natural guide"
    },
    {
        'key': 'contact',
        'text': "Ready to build something extraordinary? Drop Gaurav a message or let's talk!",
        'style': "warm, welcoming, inviting and friendly"
    },
    {
        'key': 'celebrate',
        'text': "Hehe! You found me! Sending you lots of love!",
        'style': "cute, giggly, affectionate, happy little friend"
    }
]

for t in tracks:
    out_path = f"public/audio/spider/{t['key']}.wav"
    print(f"Generating {t['key']}...")
    
    payload = {
        'contents': [{
            'role': 'user',
            'parts': [{
                'text': t['text'],
                'speech_metadata': {
                    'style': t['style']
                }
            }]
        }],
        'generationConfig': {
            'responseModalities': ['AUDIO'],
            'speechConfig': {
                'voiceConfig': {
                    'voice': 'Zephyr'
                }
            }
        }
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    success = False
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req) as resp:
                res = json.loads(resp.read().decode())
                b64data = res['candidates'][0]['content']['parts'][0]['inlineData']['data']
                audio_bytes = base64.b64decode(b64data)
                with open(out_path, 'wb') as f:
                    f.write(audio_bytes)
                print(f"  ✓ Saved {out_path} ({len(audio_bytes)} bytes)")
                success = True
                break
        except urllib.error.HTTPError as e:
            if e.code == 429:
                print(f"  Rate limited, waiting 4s before retry {attempt + 1}...")
                time.sleep(4.0)
            else:
                print(f"  HTTP error {e.code}: {e.read().decode()[:200]}")
                break
        except Exception as e:
            print(f"  Error: {e}")
            break
            
    time.sleep(2.5)

print("\nAll Zephyr audio tracks generated successfully!")
