# 智谱清言大模型开放接口SDK

## 使用

### 语言模型

[官方接口文档](https://www.bigmodel.cn/dev/api/normal-model/glm-4)

##### 同步调用

```ts
import ZhipuSDK from 'zhipu-sdk-js';

const createCompletions = async () => {
  const sdk = new ZhipuSDK({
    apiKey: 'XXX'
  });

  const result = await ai.createCompletions({
    model: 'glm-4-flash',
    message: [
      { role: 'user', content: '你好' },
    ],
    stream: false
  });
  console.log(result);
};
```

##### 流式调用

```ts
import ZhipuSDK from 'zhipu-sdk-js';

const createCompletions = async () => {
  const sdk = new ZhipuSDK({
    apiKey: 'XXX'
  });

  const result = await ai.createCompletions({
    model: 'glm-4-flash',
    message: [
      { role: 'user', content: '你好' },
    ],
    stream: true // boolean | 'append'
  }, {
    onProgress: (response) => {
      console.log(response.choices[0].delta);

      /* stream: 'append'  返回message字段，拼接delta */
      // console.log(response.choices[0].message);
    }
  });
  console.log(result);
};
```