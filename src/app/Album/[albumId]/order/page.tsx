'use client';

import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useAlbumApi from '@/api/useAlbum.api';
import { useParams, useRouter } from 'next/navigation';
import { ITrackFull } from '@/types/track';
import Button from '@/components/UI/Button';

// Composant pour les items réorganisables
function SortableItem({ id, title }: { id: number; title: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // Définir les styles en fonction des données de transformation
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '10px',
    marginBottom: '8px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {title}
    </li>
  );
}

export default function Home() {
  const router = useRouter();
  const params = useParams<{ albumId: string }>();
  const { getAlbumTracks } = useAlbumApi();
  const [items, setItems] = useState<ITrackFull[]>([]);

  // Fetch de la liste des tracks depuis l'API
  useEffect(() => {
    getAlbumTracks(10, 0, parseInt(params.albumId)).then(
      ({ data: tracks, error, success }) => {
        if (!success) {
          console.error('Erreur lors de la récupération des tracks :', error);
          return;
        }
        setItems(tracks);
      }
    );
  }, []);

  // Fonction pour gérer l'événement de fin de drag
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems(prevItems => {
        const oldIndex = prevItems.findIndex(item => item.id === active.id);
        const newIndex = prevItems.findIndex(item => item.id === over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <h1>Liste réorganisable</h1>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map(item => item.id)} // IDs uniques des items
          strategy={verticalListSortingStrategy} // Stratégie pour une liste verticale
        >
          <ul style={{ padding: 0, listStyle: 'none', maxWidth: '500px' }}>
            {items.map(item => (
              <SortableItem
                key={item.id}
                id={item.id as number}
                title={item.title}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <Button
        title="Sauvegarder l'ordre"
        handleClick={() => router.push('/')}
        className="btn__big"
      />
    </div>
  );
}
