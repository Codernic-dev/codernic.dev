// Copyright (c) Tadeop. All rights reserved.
// Proprietary and Confidential Source Code.
// Unauthorized copying, reproduction, or distribution of this file, via any medium,
// is strictly prohibited under Non-Disclosure Agreement (NDA) and applicable law.

use async_trait::async_trait;
use std::path::PathBuf;
use thiserror::Error;
use tokio::io::{AsyncRead, AsyncWrite, AsyncWriteExt};

use super::commands::{CommandRequest, CommandResponse};

#[derive(Debug, Error)]
pub enum ConfigError {
    #[error("Required file not found on disk: {0}")]
    FileNotFound(PathBuf),
    #[error("Invalid configuration: {0}")]
    InvalidConfiguration(String),
}

#[derive(Debug)]
pub struct InterprocessStream(tokio::net::TcpStream);

impl AsyncRead for InterprocessStream {
    fn poll_read(
        mut self: std::pin::Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
        buf: &mut tokio::io::ReadBuf<'_>,
    ) -> std::task::Poll<std::io::Result<()>> {
        std::pin::Pin::new(&mut self.0).poll_read(cx, buf)
    }
}

impl AsyncWrite for InterprocessStream {
    fn poll_write(
        mut self: std::pin::Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
        buf: &[u8],
    ) -> std::task::Poll<Result<usize, std::io::Error>> {
        std::pin::Pin::new(&mut self.0).poll_write(cx, buf)
    }

    fn poll_flush(
        mut self: std::pin::Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Result<(), std::io::Error>> {
        std::pin::Pin::new(&mut self.0).poll_flush(cx)
    }

    fn poll_shutdown(
        mut self: std::pin::Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Result<(), std::io::Error>> {
        std::pin::Pin::new(&mut self.0).poll_shutdown(cx)
    }
}

impl InterprocessStream {
    pub async fn connect(host: &str, port: u16) -> std::io::Result<Self> {
        let stream = tokio::net::TcpStream::connect(format!("{}:{}", host, port)).await?;
        Ok(Self(stream))
    }
}

pub struct InterprocessListener(tokio::net::TcpListener);

impl InterprocessListener {
    pub async fn bind(host: &str, port: u16) -> std::io::Result<Self> {
        let listener = tokio::net::TcpListener::bind(format!("{}:{}", host, port)).await?;
        Ok(Self(listener))
    }

    pub async fn accept(&mut self) -> std::io::Result<InterprocessStream> {
        let (stream, _) = self.0.accept().await?;
        Ok(InterprocessStream(stream))
    }
}

#[async_trait]
pub trait Transport: AsyncRead + AsyncWrite + Unpin + Send + Sync {
    async fn send_request(&mut self, req: &CommandRequest) -> anyhow::Result<()> {
        let json = serde_json::to_string(req)?;
        self.write_all(json.as_bytes()).await?;
        self.write_all(b"\n").await?;
        self.flush().await?;
        Ok(())
    }

    async fn send_response(&mut self, res: &CommandResponse) -> anyhow::Result<()> {
        let json = serde_json::to_string(res)?;
        self.write_all(json.as_bytes()).await?;
        self.write_all(b"\n").await?;
        self.flush().await?;
        Ok(())
    }
}

impl Transport for tokio::net::UnixStream {}
impl Transport for tokio::net::TcpStream {}
impl Transport for InterprocessStream {}
