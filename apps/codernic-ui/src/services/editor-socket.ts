// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

export class EditorSocket {
  private ws: WebSocket | null = null;
  private url: string;
  private onMessageCallback: ((msg: string) => void) | null = null;

  constructor(port: number = 8081) {
    const host = typeof window !== 'undefined' && window.location.hostname && window.location.hostname !== 'tauri.localhost' ? window.location.hostname : '127.0.0.1';
    this.url = `ws://${host}:${port}`;
  }

  connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('Connected to CodeAware Editor WebSocket backend');
    };

    this.ws.onmessage = (event) => {
      if (this.onMessageCallback) {
        this.onMessageCallback(event.data);
      }
    };

    this.ws.onerror = (err) => {
      console.error('Editor WebSocket error:', err);
    };

    this.ws.onclose = () => {
      console.log('Editor WebSocket closed');
    };
  }

  send(code: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(code);
    }
  }

  onMessage(callback: (msg: string) => void) {
    this.onMessageCallback = callback;
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const editorSocket = new EditorSocket();
