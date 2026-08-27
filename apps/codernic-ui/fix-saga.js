// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.


const fs = require('fs');
let content = fs.readFileSync('src/store/sagas/kernel-saga.ts', 'utf8');
const replacement = \} else if (msg.type === 'ac:chat-error') {
  const { text } = msg.payload;
  let pendingId = yield select(selectPendingAssistantId);
  if (!pendingId) {
    pendingId = uid();
    yield put(setPendingAssistantId(pendingId));
    yield put(appendMessage({ id: pendingId, role: 'assistant', text: '\n\n❌ **Error**: ' + text, streaming: false, toolCalls: [] }));
  } else {
    yield put(updateAssistantMessage({ id: pendingId, chunk: '\n\n❌ **Error**: ' + text, done: true }));
  }
  yield put(setSending(false));
} else if (msg.type === 'codernic:chat-done') {\;
content = content.replace(/\} else if \(msg\.type === 'codernic:chat-done'\) \{/, replacement);
fs.writeFileSync('src/store/sagas/kernel-saga.ts', content);

