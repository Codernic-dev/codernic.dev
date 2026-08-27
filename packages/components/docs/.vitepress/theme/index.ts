// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.

import DefaultTheme from 'vitepress/theme'
import './theme.css'
import SpecimenComponents from './components/SpecimenComponents.vue'
import ReactRenderer from './components/ReactRenderer.vue'


export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Specimen', SpecimenComponents)
    app.component('ReactSpecimen', ReactRenderer)
  }
}
