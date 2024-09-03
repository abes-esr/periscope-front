#!/bin/bash

# Paramètres par défaut du conteneur
export PERISCOPE_FRONT_API_BASEURL=${PERISCOPE_FRONT_API_BASEURL:='http://localhost:8081/'}
export PERISCOPE_FRONT_TIMELINE_URL=${PERISCOPE_FRONT_TIMELINE_URL:='http://localhost:8081/'}
export PERISCOPE_FRONT_APICOM_URL=${PERISCOPE_FRONT_APICOM_URL:='http://localhost:8081/'}


# Remplace les placeholders dans le code généré en prod
# PERISCOPE_PLACEHOLDER_VUE_APP_ROOT_API
# On va remplacer les placeholders depuis les JS originales
echo "-> Remplacement des placeholders venant du .env de vuejs dans la destination /usr/share/nginx/html/"
echo "-> PERISCOPE_FRONT_API_BASEURL=${PERISCOPE_FRONT_API_BASEURL}"
echo "-> PERISCOPE_FRONT_TIMELINE_URL=${PERISCOPE_FRONT_TIMELINE_URL}"
echo "-> PERISCOPE_FRONT_APICOM_URL=${PERISCOPE_FRONT_APICOM_URL}"
rm -rf /usr/share/nginx/html/
cp -rf /usr/share/nginx/html.orig/ /usr/share/nginx/html/
sed -i \
  "s#PLACEHOLDER_VUE_APP_PERISCOPE_V2_API_URL#${PERISCOPE_FRONT_API_BASEURL}#g" \
  /usr/share/nginx/html/assets/*
sed -i \
  "s#PLACEHOLDER_VUE_APP_TIMELINE_PERISCOPE_V1#${PERISCOPE_FRONT_TIMELINE_URL}#g" \
  /usr/share/nginx/html/assets/*
sed -i \
  "s#PLACEHOLDER_VUE_APP_WS_APICOM#${PERISCOPE_FRONT_APICOM_URL}#g" \
  /usr/share/nginx/html/assets/*


# execute nginx (cf CMD dans Dockerfile)
exec "$@"
