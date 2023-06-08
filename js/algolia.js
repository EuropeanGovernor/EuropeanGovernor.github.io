(() => {
  // ns-params:@params
  var baseURL = "/";
  var params = { algolia: { appid: "YOUR_KEY", appkey: "YOUR_APP_KEY", enabled: true, searchindex: "YOUR_INDEX" }, defaultcover: "https://www.apple.com.cn/newsroom/images/apple-logo_black.jpg.landing-regular_2x.jpg", email: "floyd.li@outlook.com", socialmedia: [{ name: "Github", url: "https://github.com/floyd-li" }] };

  // <stdin>
  var { appid, appkey, searchindex: indexName, enabled } = params.algolia;
  var searchClient = algoliasearch(appid, appkey);
  var { autocomplete, getAlgoliaResults } = window["@algolia/autocomplete-js"];
  //--------------------------------
  function sendSearchQuery(query) {
            // 创建一个新的 FormData 对象，用于发送数据
            const formData = new FormData();
            formData.append('query', query);

            // 使用 Fetch API 发送异步请求
            fetch('/search', {
              method: 'POST',
              body: formData
            })
              .then(response => response.json())
              .then(data => {
                // 在这里处理来自服务器的结果
                console.log(data.result);
              })
              .catch(error => {
                console.error('Error:', error);
              });
          }
  //--------------------------------
  function initAlgolia() {
    autocomplete({
      container: "#autocomplete",
      getSources({ query }) {
        return [
          {
            sourceId: "products",
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName,
                    query,
                    params: {
                      attributesToSnippet: ["name:10", "description:35"]
                    }
                  }
                ]
              });
            },
            //-------------------------
            onStateChange({ state }) {
                  // 检测到用户输入的查询变化时
                  if (state.query) {
                    sendSearchQuery(state.query);
                  }
            //--------------------------
            templates: {
              item({ item, components, html }) {
                return html`<a class="aa-ItemWrapper" href="${baseURL}${item.uri}">
                <div class="aa-ItemContent">
                  <div class="aa-ItemContentBody">
                    <div class="aa-ItemContentTitle">
                      ${components.Highlight({
                  hit: item,
                  attribute: "name"
                })}
                    </div>
                    <div class="aa-ItemContentDescription">
                      ${components.Snippet({
                  hit: item,
                  attribute: "description"
                })}
                    </div>
                  </div>
                  <div class="aa-ItemActions">
                    <button
                      class="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                      type="button"
                      title="Select"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path
                          d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </a>`;
              }
            }
          }
        ];
      }
    });
    document.querySelector("#autocomplete input").focus();
  }
  if (enabled) {
    initAlgolia();
  }
})();
