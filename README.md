![Logo of the project](https://github.com/jehna/babble2blog/blob/main/logo.svg?raw=true)

# Babble2Blog
> Speech to Blog Post Generator

This tool takes a speech input and drives it through OpenAPI's Whisper API to
transcribe the speech into text. The text is then fed into OpenAI's GPT-3 model
to generate a blog post.

## Getting started

You can use the tool from command line.

```shell
yarn
yarn start speech-input.mp3 blog-post-output.md
```

This installs the project's dependencies and runs the tool against the given
input audio file `speech-input.mp3` and outputs the blog post to
`blog-post-output.md`.

### Prerequisites

You need an API key for OpenAI's Whisper API and GPT-3 API. You can get these by
registering at the [OpenAI's website](https://openai.com). Note that both
Whisper and GPT-3 are paid APIs (although they're super cheap).

## Features

This project aims to be a tool that:
* Makes it easy to generate blog posts when you don't have access to keyboard
* Demonstrate state-of-the-art AI capabilities (as in 2023)
* Makes my life easier

### About the logo

The logo of this project was created using DALL·E, with the prompt:

> Icon for app that creates blog posts from speech, dribble, concept art, iOS

The [generated result](https://labs.openai.com/s/x8QFNJqeuQRnw0w0Y9HhvewP) was
then polished by hand with Inkscape.

## Contributing

At the moment this is a very crude proof-of-concept. If you still would like to
contribute, please fork the repository and use a feature branch. Pull requests
are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.
