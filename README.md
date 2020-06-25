# Pŕe requisitos #
- Máquina linux
- node v10.9.0
- npm 6.0.2
- Docker

# Configurando variáveis de ambiente
- Editar o arquivo **.env** localizado na raiz do projeto preenchendo as variáveis **VUE_APP_MAPBOX_USER_NAME** e **VUE_APP_MAPBOX_ACCESS_TOKEN** 
com as credenciais da conta mapbox. Preencher também a variável **VUE_APP_ANALYTICS_ID** com o ID do google analytics

# Buildando a imagem docker #
- Acessar caminho onde está o código fonte (raiz)
- Executar "docker build --build-arg VUE_APP_API_URL='http://{caminho_onde_esta_o_backend}/api' -t onebr-front ."

# Rodando o sistema #
- Após o build da imagem docker, deve existir uma imagem com o nome **onebr-front**
- Executar "docker run -p {porta_desejada}:80 --name onebr-front -d"
