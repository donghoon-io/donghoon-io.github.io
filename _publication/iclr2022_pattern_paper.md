---
layout: publication
title: "Learning to Remember Patterns: Pattern Matching Memory Networks for Traffic Forecasting"
year: 2022
month: 4
hide_authors: true
authors:
  - Hyunwook Lee
  - Seungmin Jin
  - Hyeshin Chu
  - Hongkyu Lim
  - Sungahn Ko
venue: ICLR 2022
venue_full: "The International Conference on Learning Representations"
abstract: "Traffic forecasting is a challenging problem due to complex road networks and sudden speed changes caused by various events on roads. Several models have been proposed to solve this challenging problem, with a focus on learning the spatio-temporal dependencies of roads. In this work, we propose a new perspective for converting the forecasting problem into a pattern-matching task, assuming that large traffic data can be represented by a set of patterns. To evaluate the validity of this new perspective, we design a novel traffic forecasting model called Pattern-Matching Memory Networks (PM-MemNet), which learns to match input data to representative patterns with a key-value memory structure. We first extract and cluster representative traffic patterns that serve as keys in the memory. Then, by matching the extracted keys and inputs, PM-MemNet acquires the necessary information on existing traffic patterns from the memory and uses it for forecasting. To model the spatio-temporal correlation of traffic, we proposed a novel memory architecture, GCMem, which integrates attention and graph convolution. The experimental results indicate that PM-MemNet is more accurate than state-of-the-art models, such as Graph WaveNet, with higher responsiveness. We also present a qualitative analysis describing how PM-MemNet works and achieves higher accuracy when road speed changes rapidly."
category:
  - "AI / NLP"
  - "Design"
featured: true
---