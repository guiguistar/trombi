# coding: utf-8

import os

def lister_fichiers(dossier):
    racine, dossiers, fichiers = next(os.walk(dossier))
    fichiers = sorted(fichiers, key=lambda fichier:fichier.split('_')[1])

    for fichier in fichiers:
        print('<img src="./img/2019/'+fichier+'" class="photo" alt="'+fichier.split('.')[0]+'">')
    return fichiers

if __name__ == '__main__':
    lister_fichiers('./img/2020')
