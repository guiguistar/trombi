# coding: utf-8

import os
import sys

#import matplotlib.pyplot as plt # Changement de librairie pour effectuer la rotation de 90 degrés

from PIL import Image

def doit(dossier):
    racine, dossiers, fichiers = next(os.walk(dossier))
    for fichier in fichiers:
        chemin = os.path.join(dossier, fichier)
        print(chemin)
        image = plt.imread(chemin)
        plt.imshow(image)
        plt.show()
        clavier = input()
        if clavier == 'exit':
            break
        
        # Ne fonctionne pas, la fenêtre avec la photo interrompt le programme?
        plt.close('all')
        
if __name__ == '__main__':
    if(not len(sys.argv) == 2):
        print('Vious devez préciser le dossier contenant les images.')
        sys.exit()
    doit(sys.argv[1])
