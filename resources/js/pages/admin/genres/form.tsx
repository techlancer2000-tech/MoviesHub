import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useFlashToast } from '@/hooks/use-flash-toast';
import {
    index as castsIndex,
    store as castsStore,
    update as castsUpdate,
} from '@/routes/casts';

interface Cast {
    id?: number;
    name: string;
    slug: string;
    description?: string;
    is_active: boolean;
}

interface CastFormData {
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    _method?: 'put';
}

interface Props {
    cast?: Cast | null;
}

export default function CastForm({ cast }: Props) {
    const isEdit = Boolean(cast?.id);

    const toast = useFlashToast();

    const { data, setData, post, processing, errors } = useForm<CastFormData>({
        name: cast?.name ?? '',
        slug: cast?.slug ?? '',
        description: cast?.description ?? '',
        is_active: cast?.is_active ?? true,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit) {
            setData('_method', 'put');
        }

        post(isEdit ? castsUpdate(cast!.id!).url : castsStore().url, {
            forceFormData: true,

            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: isEdit
                        ? 'Cast updated successfully.'
                        : 'Cast created successfully.',
                });
            },
        });
    };

    const error = (field: keyof CastFormData) =>
        errors[field] && (
            <p className="text-sm text-destructive">{errors[field]}</p>
        );

    return (
        <>
            <Head title={isEdit ? 'Edit Cast' : 'Add Cast'} />

            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isEdit ? 'Edit Cast' : 'Add Cast'}
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage cast details for movies.
                        </p>
                    </div>

                    <Button variant="outline" asChild>
                        <Link href={castsIndex()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>

                <Card className="rounded-xl">
                    <CardHeader>
                        <CardTitle>Cast Information</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Cast Name *</Label>

                                    <Input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="Comedy"
                                    />

                                    {error('name')}
                                </div>

                                <div className="space-y-2">
                                    <Label>Cast Slug *</Label>

                                    <Input
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData('slug', e.target.value)
                                        }
                                        placeholder="comedy"
                                    />

                                    {error('slug')}
                                </div>
                            </div>

                            <div>
                                <Label>Description</Label>

                                <Textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder="Enter cast description"
                                    rows={4}
                                />

                                {error('description')}
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label>Active Status</Label>

                                    <p className="text-sm text-muted-foreground">
                                        Enable this cast for movies.
                                    </p>
                                </div>

                                <Switch
                                    checked={data.is_active}
                                    onCheckedChange={(value) =>
                                        setData('is_active', value)
                                    }
                                />
                            </div>

                            {error('is_active')}

                            <div className="flex justify-end">
                                <Button disabled={processing}>
                                    {processing
                                        ? 'Saving...'
                                        : isEdit
                                          ? 'Update Cast'
                                          : 'Create Cast'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
