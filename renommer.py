# coding: utf-8

import os
import sys

# import matplotlib.pyplot as plt # Changement de librairie pour effectuer la rotation de 90 degrés

from PIL import Image

def doit(dossier, angle=0, ratio=1):
    racine, dossiers, fichiers = next(os.walk(dossier))
    for fichier in fichiers:
        chemin = os.path.join(dossier, fichier)
        print(chemin)
        image = Image.open(chemin)

        if angle:
            print(f'Rotation de l\'image de {angle} degrés.')
            image = image.rotate(angle, expand=True)

        if not ratio == 1:
            print(f'Multiplication des dimensions de l\'image par {ratio}')
            largeur, hauteur = image.size
            image = image.resize((round(largeur*ratio), round(hauteur*ratio)))

        image.show()

        clavier = input()
        if clavier == 'exit':
            break
        else:
            nomFichier = os.path.join(dossier, clavier + ".jpg")
            image.save(nomFichier)
        
        # Ne fonctionne pas, la fenêtre avec la photo interrompt le programme?
        image.close()
        
if __name__ == '__main__':
    if(not len(sys.argv) == 2):
        print('Vious devez préciser le dossier contenant les images.')
        sys.exit()
    doit(sys.argv[1], angle=270, ratio=0.1)
