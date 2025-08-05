yt() {
  prepare_env && \
  echo "✅ setup environment" && \
  add_next_to_app && \
  echo "✅ added Next.js app" && \
  add_fastify_to_app && \
  echo "✅ added Fastify app" && \
  handle_json && \
  echo "✅ modified json files" && \
  add_essential_to_shared && \
  echo "✅ installed shared pkg in shared" && \

  echo "did stuff ✅✅✅"
}
