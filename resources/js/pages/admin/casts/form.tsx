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
    profile_image?: string | null;
    biography?: string | null;
    date_of_birth?: string | null;
    gender?: bigint | null;
    country_id?: number | null;
    is_active: boolean;
    is_cast: boolean;
}

interface CastFormData {
    name: string;
    slug: string;
    profile_image: File | null;
    biography: string;
    date_of_birth: string;
    gender: bigint;
    country_id: string;
    is_active: boolean;
    is_cast: boolean;
    _method?: 'put';
}

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Country {
    id: number;
    name: string;
}

interface Gender {
    value: number;
    name: string;
}

interface Props {
    cast?: Cast | null;
    countries: Country[];
    genders: Gender[];
}

export default function CastForm({ cast, countries, genders }: Props) {
    const isEdit = Boolean(cast?.id);
    const toast = useFlashToast();
    const { data, setData, post, processing, errors } = useForm<CastFormData>({
        name: cast?.name ?? '',

        slug: cast?.slug ?? '',

        profile_image: null,

        biography: cast?.biography ?? '',

        date_of_birth: cast?.date_of_birth ?? '',

        gender: cast?.gender?.toString() ?? '',

        country_id: cast?.country_id?.toString() ?? '',

        is_active: cast?.is_active ?? true,

        is_cast: cast?.is_cast ?? true,
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
                            Manage actors and actresses for movies.
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
                                        placeholder="Tom Hanks"
                                    />

                                    {error('name')}
                                </div>

                                <div className="space-y-2">
                                    <Label>Slug *</Label>

                                    <Input
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData('slug', e.target.value)
                                        }
                                        placeholder="tom-hanks"
                                    />

                                    {error('slug')}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Profile Image</Label>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            'profile_image',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                />

                                {error('profile_image')}
                            </div>

                            <div className="space-y-2">
                                <Label>Biography</Label>

                                <Textarea
                                    value={data.biography}
                                    onChange={(e) =>
                                        setData('biography', e.target.value)
                                    }
                                    placeholder="Enter actor biography"
                                    rows={5}
                                />

                                {error('biography')}
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Date of Birth</Label>

                                    <Input
                                        type="date"
                                        value={data.date_of_birth}
                                        onChange={(e) =>
                                            setData(
                                                'date_of_birth',
                                                e.target.value,
                                            )
                                        }
                                    />

                                    {error('date_of_birth')}
                                </div>

                                <div className="space-y-2">
                                    <Label>Gender</Label>

                                    <Select
                                        value={data.gender}
                                        onValueChange={(value) =>
                                            setData('gender', value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {genders.map((gender) => (
                                                <SelectItem
                                                    key={gender.value}
                                                    value={gender.value.toString()}
                                                >
                                                    {gender.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {error('gender')}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Country</Label>

                                <Select
                                    value={data.country_id}
                                    onValueChange={(value) =>
                                        setData('country_id', value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem
                                                key={country.id}
                                                value={country.id.toString()}
                                            >
                                                {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {error('country_id')}
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

                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label>Person Type</Label>

                                    <p className="text-sm text-muted-foreground">
                                        Enable for cast members, disable for crew members.
                                    </p>
                                </div>

                                <Switch
                                    checked={data.is_cast}
                                    onCheckedChange={(value) =>
                                        setData('is_cast', value)
                                    }
                                />
                            </div>

                            {error('is_cast')}

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
