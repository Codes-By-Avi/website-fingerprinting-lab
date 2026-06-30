# website-fingerprinting-lab
Implementation of a JavaScript-based cache-occupancy side-channel attack for website fingerprinting, including trace collection, analysis, and machine learning classification experiments.

# Website Fingerprinting Lab

## Overview
This project implements a JavaScript-based cache-occupancy side-channel attack to perform website fingerprinting. The goal is to analyze whether different websites can be distinguished based on microarchitectural behavior observed through browser-based timing and cache effects.

## What I Did
- Implemented cache-occupancy trace collection using JavaScript
- Collected and processed side-channel traces from different website scenarios
- Analyzed timing and cache behavior patterns
- Applied machine learning models (Random Forest) to classify website activity based on traces
- Evaluated model performance using classification metrics

## Technologies Used
- JavaScript
- Python
- NumPy / Pandas
- Scikit-learn
- Browser developer tools
- Linux command line

## Key Concepts
- Cache side-channel attacks
- Website fingerprinting
- Browser-based security vulnerabilities
- Machine learning classification of system traces

## Project Structure
- part1/ – JavaScript warm-up timing analysis
- part2/ – Trace collection and ML classification
- part3/ – Root cause analysis of signal behavior
- part4/ – Countermeasure evaluation
- report.pdf – Final written report

## Note
This project was completed as part of a graduate-level cybersecurity course at the University of Central Florida.
